export type User = {
  id: string;
  setter: string; // address
  data: {
    address: string;
    joinedDate: string;
    name: string;
    avatar: string;
    ownership: string[];
  };
};
