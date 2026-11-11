import { NextResponse } from "next/server";

export const revalidate = 300; // Cache and revalidate approximately every 5 minutes (300 seconds)

export interface GitHubRepoItem {
  id: number;
  name: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
  topics: string[];
}

const FEATURED_NAMES = new Set([
  "kubernetes-monitoring-platform",
  "foodies-react-web-app",
  "foodie",
  "abhiraj-portfolio",
  "portfolio",
]);

export async function GET() {
  const username = "Abhiraj2508";
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Abhiraj-Portfolio-Sync/1.0",
    };

    // Optional token to increase rate limit if configured on server (never exposed to client)
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const status = response.status;
      return NextResponse.json(
        {
          repos: [],
          error: status === 403 ? "Rate limit reached. Try again shortly." : `GitHub API error: ${status}`,
          status,
        },
        { status: 200 } // return 200 so client gets formatted error payload safely
      );
    }

    const rawRepos = await response.json();

    if (!Array.isArray(rawRepos)) {
      return NextResponse.json({ repos: [], error: "Unexpected API response format" }, { status: 200 });
    }

    // Filter requirements:
    // 1. Exclude forks
    // 2. Exclude archived
    // 3. Exclude portfolio repository itself
    // 4. Exclude repositories without a useful description
    // 5. Show only public repositories
    // 6. Do not duplicate manually featured repositories
    const filtered: GitHubRepoItem[] = rawRepos
      .filter((repo: any) => {
        if (!repo || typeof repo !== "object") return false;
        if (repo.fork === true) return false;
        if (repo.archived === true) return false;
        if (repo.private === true || repo.visibility === "private") return false;

        const nameLower = (repo.name || "").toLowerCase().trim();
        if (!nameLower) return false;

        // Exclude portfolio itself
        if (nameLower === "abhiraj-portfolio" || nameLower === "portfolio") return false;

        // Exclude already featured projects
        if (FEATURED_NAMES.has(nameLower)) return false;

        // Exclude repos without a useful description
        const desc = (repo.description || "").trim();
        if (!desc || desc.length < 5) return false;

        return true;
      })
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language || null,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        updatedAt: repo.updated_at,
        url: repo.html_url,
        topics: Array.isArray(repo.topics) ? repo.topics : [],
      }));

    return NextResponse.json(
      {
        repos: filtered,
        count: filtered.length,
        syncedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err: any) {
    console.error("Error fetching GitHub repositories:", err);
    return NextResponse.json(
      {
        repos: [],
        error: "Unable to reach GitHub. Please check network connection.",
      },
      { status: 200 }
    );
  }
}

