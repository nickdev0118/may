import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";

interface IProps extends IComponent {}

interface ISkill {
  id: number;
  label: string;
}

const SKILL_DATA: ISkill[] = [
  {
    id: 1,
    label: "General Skill",
  },
  {
    id: 2,
    label: "Software Skill",
  },
  {
    id: 3,
    label: "Technology Skill",
  },
  {
    id: 4,
    label: "Training Skill",
  },
  {
    id: 5,
    label: "Dental Assistant Skill",
  },
  {
    id: 6,
    label: "Front Office Skill",
  },
];

const RequiredSkillsTab: React.FC<IProps> = ({}: IProps) => {
  return (
    <div className="px-6 sm:px-10 xl:px-20">
      <div className="flex flex-col gap-12">
        {SKILL_DATA.map((item: ISkill) => (
          <div key={item.label} className="grid grid-cols-7 items-center">
            <div className="col-span-2">
              <Typography
                placeholder=""
                className="text-sm lg:text-base text-dark font-bold"
              >
                {item.label}
              </Typography>
            </div>
            <div className="col-span-5">
              <Typography
                placeholder=""
                className="text-xs lg:text-sm text-secondary font-normal cursor-pointer"
              >
                Edit
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end  pt-3">
        <Button variant="filled" color="secondary" className="text-sm">
          Update Information
        </Button>
      </div>
    </div>
  );
};

export default RequiredSkillsTab;
