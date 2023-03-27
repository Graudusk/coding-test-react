export interface Repo {
  id: string;
  name: string;
  full_name: string;
  private: string;
  owner: { login: string; avatar_url: string; url: string };
  html_url: string;
  description: string;
  created_at: string;
  language: string;
  license: { name: string };
  score: string;
}
