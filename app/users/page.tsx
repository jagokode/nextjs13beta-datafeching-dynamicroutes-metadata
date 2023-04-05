import type { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Users',
};

export default async function UsersPage() {
	// Fetch data on the server
	const usersData: Promise<User[]> = getAllUsers();
	const users = await usersData;

	const content = (
		<section>
			<h2>
				<Link href="/">Back to Home</Link>
			</h2>
			<br />
			{users.map((user) => {
				return (
					<p key={user.id}>
						<Link href={`/users/${user.id}`}>{user.name}</Link>
						<br />
						<br />
					</p>
				);
			})}
		</section>
	);

	return content;
}
