export interface LinkData {
  id: number;
  created_at: number;
  update_at: string;
  url: string;
  title: string;
  description: string;
  image_source: string;
  folder_id: number;
}

export interface FolderData {
  id: number;
  created_at: string;
  name: string;
  user_id: number;
  link: {
    count: number;
  };
}
