export interface IAppConfig {
    env: {
        name: string;
    },
    poke_api: {
        base_url: string;
        base_api: string;
        starting_index: number;
        display_count: number;
    }
}