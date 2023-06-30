export type users = {
  id: string;
  icon: string;
  name: string;
  job: string;
  comment: string;
  email: string;
};

export type Islands = {
  islandName: string;
  islandDescription: string;
  adminId: string;
  createDate: Date | undefined;
  icon: string;
  id: number;
};
export type Projects = {
  projectName: string;
  projectDescription: string;
  adminId: string;
  createDate: Date | undefined;
  icon: string;
  adminIslandId: number;
  id: number;
};

export type RecruitNewUser = {
  projectId: number;
  recruitTitle: string;
  recruitJob: string;
  recruitPoint: string;
  createDate: Date | undefined;
  projectName: string;
  projectIcon: string;
  id: number;
};

export type RecruitNewIsland = {
  projectId: number;
  recruitTitle: string;
  recruitJob: string;
  recruitPoint: string;
  createDate: Date | undefined;
  projectName: string;
  projectIcon: string;
  id: number;
};

export type RequestProject = {
  projectId: number;
  islandId: number;
  id: number;
  islands: Islands;
};

export type JoinProjects = {
  islandId: number;
  projectId: number;
  id: number;
  islands: Islands;
};
