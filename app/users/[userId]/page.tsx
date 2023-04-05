import getUser from '@/lib/getUser';
import getUserPosts from '@/lib/getUserPosts';
import { Suspense } from 'react';
import UserPosts from './components/UserPosts';
import type { Metadata } from 'next';

type Params = {
	params: {
		userId: string;
	};
};

export async function generateMetadata({
	params: { userId },
}: Params): Promise<Metadata> {
	const userData: Promise<User> = getUser(userId);
	const user: User = await userData;

	return {
		title: user.name,
		description: `Page of ${user.name}`,
	};
}

export default async function UserPage({ params: { userId } }: Params) {
	const userData: Promise<User> = getUser(userId);
	const userPostsData: Promise<Post[]> = getUserPosts(userId);

	// Fetch data in parallel
	// const [user, userPosts] = await Promise.all([userData, userPostsData])

	// Fetch data with Loading UI and Suspense
	const user = await userData;

	return (
		<div>
			<h2>{user.name}</h2>
			<br />
			{/* Fetch data in parallel
			<UserPost posts={userPosts} /> */}

			{/* Fetch data with Loading UI and Suspense */}
			<Suspense fallback={<h2>Loading...</h2>}>
				{/* @ts-expect-error Async Server Component */}
				<UserPosts promise={userPostsData} />
			</Suspense>
		</div>
	);
}
