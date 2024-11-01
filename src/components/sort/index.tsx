import DropdownHits from "./dropdownHits";
import DropdownSort from "./dropdownSort";

const Sort: React.FC = () => {
  return (
    <>
      <div className="flex justify-end items-center h-[80px]">
        <DropdownSort />
        <DropdownHits />
      </div>
    </>
  )
}

export default Sort;
