import { LeetCodeProblem, leetcodeDB } from './database';

export interface LeetCodeApiResponse {
  stat_status_pairs: Array<{
    stat: {
      question_id: number;
      frontend_question_id: number;
      question__title: string;
      question__title_slug: string;
      total_acs: number;
      total_submitted: number;
    };
    status: string | null;
    difficulty: {
      level: number;
    };
    paid_only: boolean;
    is_favor: boolean;
    frequency: number;
    progress: number;
  }>;
  num_solved: number;
  num_total: number;
  ac_easy: number;
  ac_medium: number;
  ac_hard: number;
  stat_status_pairs_count: number;
}

class LeetCodeService {
  private readonly API_ENDPOINT = 'https://leetcode.com/api/problems/all/';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  private async fetchProblemsWithFallback(): Promise<LeetCodeProblem[]> {
    // Try the official API first, then fall back to sample data for development
    try {
      return await this.fetchAllProblemsFromAPI();
    } catch (error) {
      console.warn('Failed to fetch from LeetCode API, using sample data:', error);
      return this.getSampleProblems();
    }
  }

  private async fetchAllProblemsFromAPI(): Promise<LeetCodeProblem[]> {
    // Simplified API call - try with a much simpler query first
    const response = await fetch('https://leetcode.com/api/problems/all/');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.stat_status_pairs) {
      throw new Error('Invalid API response format');
    }

    return data.stat_status_pairs.map((item: any, index: number) => ({
      id: item.stat.frontend_question_id,
      title: item.stat.question__title,
      slug: item.stat.question__title_slug,
      difficulty: this.mapDifficulty(item.difficulty.level),
      isPaidOnly: item.paid_only,
      acRate:
        item.stat.total_acs && item.stat.total_submitted
          ? (item.stat.total_acs / item.stat.total_submitted) * 100
          : 0,
      status: item.status ? (item.status === 'ac' ? 'ac' : 'notac') : null,
    }));
  }

  private mapDifficulty(level: number): 'Easy' | 'Medium' | 'Hard' {
    switch (level) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return 'Medium';
    }
  }

  private getSampleProblems(): LeetCodeProblem[] {
    return [
      {
        id: 1,
        title: 'Two Sum',
        slug: 'two-sum',
        difficulty: 'Easy',
        isPaidOnly: false,
        acRate: 49.2,
        status: null,
      },
    ];
  }

  async fetchAllProblems(
    onProgress?: (current: number, total: number) => void
  ): Promise<LeetCodeProblem[]> {
    try {
      console.log('Attempting to fetch problems from LeetCode...');

      const problems = await this.fetchProblemsWithFallback();

      if (onProgress) {
        onProgress(problems.length, problems.length);
      }

      console.log(`Successfully fetched ${problems.length} problems`);
      return problems.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error fetching problems:', error);
      throw error;
    }
  }

  async syncProblems(onProgress?: (current: number, total: number) => void): Promise<boolean> {
    try {
      // Check if we need to sync
      const metadata = await leetcodeDB.getMetadata();
      const now = Date.now();

      if (metadata && now - metadata.lastFetched < this.CACHE_DURATION) {
        console.log('Problems are up to date, skipping sync');
        return false;
      }

      console.log('Syncing problems from LeetCode API...');

      const problems = await this.fetchAllProblems(onProgress);

      // Save to database
      await leetcodeDB.saveProblems(problems);
      await leetcodeDB.saveMetadata({
        lastFetched: now,
        totalProblems: problems.length,
        version: '1.0.0',
      });

      console.log(`Successfully synced ${problems.length} problems`);
      return true;
    } catch (error) {
      console.error('Error syncing problems:', error);
      throw error;
    }
  }

  async getAllProblems(): Promise<LeetCodeProblem[]> {
    return leetcodeDB.getAllProblems();
  }

  async searchProblems(query: string): Promise<LeetCodeProblem[]> {
    return leetcodeDB.searchProblems(query);
  }

  getProblemUrl(slug: string): string {
    return `https://leetcode.com/problems/${slug}/`;
  }

  async isDataStale(): Promise<boolean> {
    const metadata = await leetcodeDB.getMetadata();
    if (!metadata) return true;

    const now = Date.now();
    return now - metadata.lastFetched > this.CACHE_DURATION;
  }

  async getLastSyncDate(): Promise<Date | null> {
    const metadata = await leetcodeDB.getMetadata();
    return metadata ? new Date(metadata.lastFetched) : null;
  }

  async getTotalProblemsCount(): Promise<number> {
    return leetcodeDB.getCount();
  }
}

export const leetcodeService = new LeetCodeService();
