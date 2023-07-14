export type Collection = {
  id: string;
  setter: string; // address
  data: {
    name: string;
    communityId: string;
    description: string;
    creationDate: string;
    collectionUnits: number;
    address: string;
  };
};
