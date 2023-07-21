export type CommunityPost = {
  id: string;
  setter: string; // address
  data: {
    title: string;
    text: string;
    image: string;
    communityId: string;
    public: boolean;
    date: string;
  };
};
