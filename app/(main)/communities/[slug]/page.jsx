import CommunityPage from './_render';
import { getCommunities, getCommunityBySlug } from '../_actions';

const page = async ({ params }) => {
  const { slug } = await params;
  const { user, usersCommunities } = await getCommunities();
  const community = await getCommunityBySlug(slug);

  return <CommunityPage community={community} usersCommunities={usersCommunities} />;
};

export default page;
