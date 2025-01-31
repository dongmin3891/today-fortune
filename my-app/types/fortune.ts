export interface FortuneHistory {
    date: string;
    fortune: string;
}

export interface FortuneState {
    lastCheckedAt: string; // ISO string
    fortune: string;
    nextAvailableAt: string; // ISO string
}
