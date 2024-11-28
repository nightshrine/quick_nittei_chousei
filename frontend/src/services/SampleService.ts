import { ApiService } from './ApiService';

export interface ISampleResponse {
    id: number;
    name: string;
}

/**
 * マスタ初期化サービス
 */
export class SampleService {
    /**
     * メニューマスタ初期化
     */
    public static async getSampleName(): Promise<string> {
        // マスタ初期化APIを呼び出す
        const sampleResponse: ISampleResponse =
            await ApiService.callGetApi<ISampleResponse>('/');
        return sampleResponse.name;
    }
}
