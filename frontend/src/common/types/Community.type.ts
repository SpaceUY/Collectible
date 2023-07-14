export type Community = {
  id: string;
  setter: string; // address
  data: {
    creationDate: string;
    name: string;
    backgroundColor: string;
    owners: string[];
    logo: string | null;
    description: string;
  };
};
