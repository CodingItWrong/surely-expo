declare type WidthAndHeight = {
    width: number;
    height: number;
};
export default function AutoSizer({ children, }: {
    children: ({ width, height }: WidthAndHeight) => any;
}): JSX.Element;
export {};
