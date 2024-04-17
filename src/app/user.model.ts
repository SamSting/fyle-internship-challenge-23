// user.model.ts
export interface User {
	name?: string; // Optional property for the user's name
	login: string; // The username
	bio?: string; // Optional property for the user's bio
	avatar_url: string; // URL for the user's avatar
	html_url: string; // URL for the user's GitHub profile
	// Add other properties if needed
  }
  