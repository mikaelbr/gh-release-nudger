import { Octokit } from "@octokit/rest";
import { getSecret } from "astro:env/server";

const token = getSecret("GITHUB_TOKEN");
if (!token) {
  throw new Error("GITHUB_TOKEN environment variable is required");
}

const octokit = new Octokit({
  auth: token,
});

export interface Release {
  id: number;
  name: string;
  tag_name: string;
  created_at: string;
  published_at: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  assets: {
    id: number;
    name: string;
    size: number;
    download_count: number;
  }[];
}

export async function getReleases(
  owner: string,
  repo: string
): Promise<Release[]> {
  try {
    const { data } = await octokit.repos.listReleases({
      owner,
      repo,
    });

    return data.map((release) => ({
      id: release.id,
      name: release.name || "",
      tag_name: release.tag_name,
      created_at: release.created_at,
      published_at: release.published_at || "",
      body: release.body || "",
      draft: release.draft,
      prerelease: release.prerelease,
      assets: release.assets.map((asset) => ({
        id: asset.id,
        name: asset.name,
        size: asset.size,
        download_count: asset.download_count,
      })),
    }));
  } catch (error) {
    console.error(`Error fetching releases for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function getRepository(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    });

    return {
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      language: data.language,
      default_branch: data.default_branch,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (error) {
    console.error(`Error fetching repository ${owner}/${repo}:`, error);
    throw error;
  }
}
