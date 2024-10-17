export interface UserProps {
  name: string;
  profile_pic: string;
  username: string;
  timestamp: number;
  onFollow?: () => void; // Optional callback for follow action
}
