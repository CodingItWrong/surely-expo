export default function YearPicker({ selectedYear, selectingYear, onPressYear, }: {
    selectedYear: number | undefined;
    selectingYear: boolean;
    onPressYear: (year: number) => any;
}): JSX.Element;
