export type FileSystemType = 'journaling' | 'read-only' | 'standard';

export interface AnalysisResult {
    fileSystemType: FileSystemType;
    performanceMetrics: {
        readSpeed: number;
        writeSpeed: number;
        errorRate: number;
    };
    recoverySuccessRate: number;
}