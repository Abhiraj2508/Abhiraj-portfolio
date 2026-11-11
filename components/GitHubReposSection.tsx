"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Code2,
  ExternalLink,
  GitFork,
  RefreshCw,
  Star,
} from "lucide-react";
import type { GitHubRepoItem } from "@/app/api/github-repos/route";

function getLanguageColor(lang: string | null): string {
  switch (lang?.toLowerCase()) {
    case "javascript":
      return "#f7df1e";
    case "typescript":
      return "#3178c6";
    case "python":
      return "#3572a5";
    case "go":
    case "go template":
      return "#00add8";
    case "shell":
    case "bash":
      return "#89e051";
    case "html":
      return "#e34c26";
    case "css":
      return "#563d7c";
    case "dockerfile":
      return "#38bdf8";
    case "hcl":
      return "#844fba";
    default:
      return "#c084fc";
  }
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function GitHubReposSection() {
  const [repos, setRepos] = useState<GitHubRepoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRepos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github-repos");
      const data = await res.json();
      if (data.repos) {
        setRepos(data.repos);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err: any) {
      setError("Failed to synchronize with GitHub. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="github-repos-wrapper">
      <div className="repos-subhead">
        <div className="eyebrow">GitHub Activity · Automated Sync</div>
        <h3 className="repos-subtitle">Latest GitHub Repositories.</h3>
        <p className="repos-desc">
          Dynamically synchronized via the GitHub REST API (revalidated every 5 minutes). Any new public repository
          you push to GitHub will automatically appear here.
        </p>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="github-repos-grid">
          {[1, 2].map((i) => (
            <div key={i} className="project-feature-card repo-skeleton-card">
              <div className="skeleton-bar skeleton-header" />
              <div className="skeleton-banner" />
              <div className="skeleton-bar skeleton-title" />
              <div className="skeleton-bar skeleton-desc" />
              <div className="skeleton-bar skeleton-desc short" />
              <div className="skeleton-bar skeleton-footer" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="repos-status-box error">
          <div className="status-box-header">
            <span className="dot error" />
            <span>GitHub Sync Notice</span>
          </div>
          <p>{error}</p>
          <button className="btn primary btn-retry" onClick={fetchRepos}>
            <RefreshCw size={14} /> Retry Sync
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && repos.length === 0 && (
        <div className="repos-status-box empty">
          <div className="status-box-header">
            <Code2 size={20} className="status-box-icon" />
            <span>All Active Projects Currently Highlighted Above</span>
          </div>
          <p>
            Your featured production systems are currently showcased in the main section above. New public repositories
            with descriptions will automatically sync and populate here.
          </p>
          <a
            href="https://github.com/Abhiraj2508"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Visit GitHub Profile <ExternalLink size={14} />
          </a>
        </div>
      )}

      {/* Success / Repos Grid */}
      {!loading && !error && repos.length > 0 && (
        <div className="github-repos-grid">
          {repos.map((repo, idx) => {
            const num = (idx + 4).toString().padStart(2, "0");
            const langColor = getLanguageColor(repo.language);
            return (
              <div
                key={repo.id}
                className="project-feature-card dynamic-repo-card"
                data-node-label={repo.name}
              >
                <div className="project-card-header">
                  <span className="project-card-num">REPO / {num}</span>
                  <span className="project-card-status">
                    <span className="status-dot green" />
                    PUBLIC REPO
                  </span>
                </div>

                <div className="project-banner-wrap">
                  <img
                    src="/github-repo-fallback.png"
                    alt={`${repo.name} repository banner`}
                    className="project-banner-img"
                  />
                  {repo.language && (
                    <div className="project-badge-overlay top-right">
                      <span
                        className="lang-dot"
                        style={{ backgroundColor: langColor, boxShadow: `0 0 8px ${langColor}` }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                </div>

                <div className="project-sub">GITHUB REPOSITORY</div>
                <h3 className="project-title repo-title">{repo.name}</h3>
                <p className="project-desc repo-desc">{repo.description}</p>

                {/* Repo Meta Strip */}
                <div className="repo-meta-row">
                  {repo.language && (
                    <span className="repo-meta-item">
                      <span className="lang-indicator" style={{ backgroundColor: langColor }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-meta-item">
                    <Star size={13} className="meta-icon" />
                    {repo.stars}
                  </span>
                  <span className="repo-meta-item">
                    <GitFork size={13} className="meta-icon" />
                    {repo.forks}
                  </span>
                  <span className="repo-meta-item date">
                    <Calendar size={13} className="meta-icon" />
                    {formatDate(repo.updatedAt)}
                  </span>
                </div>

                {/* GitHub Action Link */}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-repo-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub <ExternalLink size={15} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

