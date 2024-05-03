export const InProgress = () => {
  return (
    <div className="w-fit bg-white rounded-md border border-[#91D5FF] text-center text-[#1890FF] text-xs font-normal leading-tight px-3 py-2">
      In-Progress
    </div>
  );
};

export const Completed = () => {
  return (
    <div className="w-fit bg-[#F6FFED] rounded-md border border-[#B7EB8F] text-center text-[#52C41A] text-xs font-normal leading-tight px-3 py-2">
      Completed
    </div>
  );
};

export const Unassigned = () => {
  return (
    <div className="w-fit bg-[#FFF2E8] rounded-md border border-[#FFBB96] text-center text-[#FA541C] text-xs font-normal leading-tight px-3 py-2">
      Unassigned
    </div>
  );
};

export const InProgressText = () => {
  return (
    <div className="text-gray-600 text-xs font-normal leading-tight">
      InProgress
    </div>
  );
};

export const CompletedText = () => {
  return (
    <div className="text-gray-600 text-xs font-normal leading-tight">
      Completed
    </div>
  );
};

export const UnassignedText = () => {
  return (
    <div className="text-gray-600 text-xs font-normal font-['Noto_Sans'] leading-tight">
      Unassigned
    </div>
  );
};
