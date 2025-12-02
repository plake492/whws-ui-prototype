import Communities from './_render';
import { getCommunities } from './_actions';

export default async function CommunitiesPage() {
  const { user, allCommunities, usersCommunities } = await getCommunities();

  return <Communities user={user} allCommunities={allCommunities} usersCommunities={usersCommunities} />;
}
