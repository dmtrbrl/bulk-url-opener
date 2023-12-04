export type History = {
  date: Date;
  urls: string[];
}[];

/**
 * Service for managing a history of URLs.
 * The history is stored in the browser's localStorage.
 */
export class HistoryService {
  private static readonly HISTORY_KEY = "history";

  /**
   * Retrieves the history of URLs from localStorage, sorted by date starting from the latest.
   * @returns The history of URLs, sorted by date.
   */
  public getHistory(): History {
    const historyJson = localStorage.getItem(HistoryService.HISTORY_KEY);
    if (historyJson) {
      const history = JSON.parse(historyJson, (key, value) => (key === "date" ? new Date(value) : value)) as History;

      // Sort history by date, from latest to earliest
      return history.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    return [];
  }

  /**
   * Adds a new set of URLs to the history or updates the date of an existing entry.
   * @param urls - The URLs to add or update in the history.
   */
  public pushToHistory(urls: string[]): void {
    const history = this.getHistory();
    const existingEntryIndex = history.findIndex(
      (entry) => entry.urls.length === urls.length && entry.urls.every((url, index) => url === urls[index]),
    );

    if (existingEntryIndex !== -1) {
      history[existingEntryIndex].date = new Date();
    } else {
      const newEntry = { date: new Date(), urls };
      history.push(newEntry);
    }

    localStorage.setItem(HistoryService.HISTORY_KEY, JSON.stringify(history));
  }

  /**
   * Clears the entire URL history from localStorage.
   */
  public clearHistory(): void {
    localStorage.removeItem(HistoryService.HISTORY_KEY);
  }
}

export const historyService = new HistoryService();
