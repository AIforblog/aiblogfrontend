export interface UserProps {
  name: string;
  profile_pic: string;
  username: string;
  timestamp: number;
  cover_photo: string;
  isVerified: boolean;
  user_bio: string;
  user_website: string;
  user_join_date: string;
  user_followers: number;
  user_following: number;
  onFollow?: () => void; // Optional callback for follow action
}
