import { IAthlete, IAthleteRespone } from "@/types/athlete.type";

export interface IUseSessionStore {
    athleteLoggedInfo: IAthlete | null;
    setAtleteLoggedInfo: (athleteInfo: IAthleteRespone) => void;
    clearAtleteLoggedInfo: () => void;
}