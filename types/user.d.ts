export interface UserProps {
	coverPic?: string | null;
	id: string;
	username: string;
	name: string;
	profilePic: string;
	firstName?: string;
	lastName?: string;
	bio: string;
	externalLink: string;
	country?: string;
	state?: string;
	phoneNumber?: string;
	followersCount: number;
	followingCount: number;
	createdAt?: string | number;
	coverPhoto: string;
	verified?: boolean;
	// timestamp: number;
	// cover_photo: string;
	// userId: string,
	// isVerified: boolean;
	// user_website: string;
	// user_join_date: string;
	// user_followers: number;
	// user_following: number;
	// onFollow?: () => void; // Optional callback for follow action
}
