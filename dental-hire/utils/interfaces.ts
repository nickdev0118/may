export interface IComponent {
  className?: string;
}

export interface INavItem {
  id: number;
  icon: string;
  path: string;
  name: string;
}

export interface IBank {
  id: number;
  logo: string;
  name: string;
  bankNum: string;
  status: string;
  isDefault: boolean;
}

export interface IMsg {
  id: number;
  sender: string;
  imgSrc: string;
  message: string;
  senderData?: {
    avatar: string;
    name: string;
  };
}

export interface INotification {
  id: number;
  title: string;
  content: string;
  receivedAt: string;
  imgSrc: string;
  type: string;
}

export interface ITabitem {
  id: number;
  label: string;
}

export interface ILanguage {
  id: number;
  language: string;
  fluency: string;
}

export interface ISkills {
  id: string;
  title: string;
  level: string;
}

export interface IProfessional {
  id: string;
  avatar: string;
  name: string;
  type: string;
  rate: string;
  skills: ISkills[];
  distance: number;
  hourlyRate: number;
  bookings: string;
  lateCancel: string;
  shows: number;
  lastLoginAt: string;
  jobProvider: string;
  workedHours: number;
  Education: string;
  licencedIn: string;
  languages: ILanguage[];
  isFavorite: boolean;
  bio: string;
}

export interface IDashbordProfessional {
  id: string;
  name: string;
  avatar: string;
  isFavorite: boolean;
  createdAt: string;
  type:string;
}

export interface IBooking {
  id: number;
  label: string;
  bookingTime: string;
  bookingWith: string;
  breakTime: string;
  estHours: string;
  hourlyRate: string;
  payment: string;
  status: string;
}

export interface IJob {
  id: number;
  title: string;
  numOfAppliers: number;
  description: string;
  status: string[];
  applyStatus: string;
  expYears: string;
  type: string;
  isArchived: boolean;
  isOpened: boolean;
  postedAt: string;
  practiceTypes: { id: string; name: string }[];
  scheduleDate?: Date;
  startTime?: String;
  endTime?: String;
  proType?: string;
  expYearsId?: number;
  startDate?: string;
  availableTime?: {
    startAt: string;
    endAt: string;
    timezone: string;
  }
}

export interface IApplicant {
  id: number;
  avatar: string;
  name: string;
  reviews: number;
  rate: number;
  booking: number;
}

export interface IUserItem {
  id: number;
  name: string;
  imgSrc: string;
  lastMessage: string;
  lastSentAt: string;
  unreadCount: number;
  sentAt?: string;
  chatterData?: {
    avatar: string;
    name: string;
  };
}

export interface IMessage {
  id: number;
  isReceived: boolean;
  sentAt: string;
  message: string;
}

export interface IUserData {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  avatar?: any;
  practiceName?: string;
  userId?: string;
  userType?: number;
  jobRole?: string;
  address?: string;
  position?: string;
  expTime?: string;
  verifyData?: any;
}

export interface ICalEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "unavailable" | "available";
  blockId: string;
}

export interface IWeekAvailability {
  id: string;
  enable: boolean;
  label: string;
  timeSlots: Array<{
    id: string;
    start: string;
    end: string;
    [key: string]: boolean | string;
  }>;
}

export interface IUserInfo {
  id: string;
  name: string;
  address: string;
  position: string;
  expTime: string;
  avatar?: string;
  verifyData: {
    addressAdded: boolean;
    officeContactAdded: boolean;
    avatarUploaded: boolean;
    practiceDescAdded: boolean;
    emailConfirmed: boolean;
  };
  reviews?: string[];
}

export interface IChoosePlan {
  id: string;
  type: string;
  icon: string;
  cost: string;
  item: Array<
  {
    "id": number;
    "checked": boolean;
    "content": string;
  }
  >
}

export interface IAdminInfo { 
  id: string,
  position: string,
  name: string,
  email: string,
  status: string
}

export interface CountryType {
  code: string;
  label: string;
  suggested?: boolean;
}

export interface IExpYear {
  id: string;
  title: string;
}

export interface IFormValues {
  jobId?: number;
  title: string;
  description: string;
  General?: boolean;
  Private?: boolean;
  HMO?: boolean;
  PPO?: boolean;
  Orthodontics?: boolean;
  Pedodontics?: boolean;
  Periodontics?: boolean;
  Corporate?: boolean;
  [`Multi-specialty`]?: boolean;
  [`Oral surgery`]?: boolean;
  Prosthodontics?: boolean;
  Medicaid?: boolean;
  [`Single doctor`]?: boolean;
  [`Multi doctor`]?: boolean;
  jobType?: string;
  professionalType?: string;
  requiredYear?: string;
  isReadPolicy?: boolean;
}

export interface IPracticeType {
  id: string;
  title: keyof IFormValues;
}
