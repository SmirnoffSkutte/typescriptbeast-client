import { PropsWithChildren } from "react";
type Props = {
    children?: React.ReactNode
  };
export type ReactFCWithChildren = React.FC<PropsWithChildren<Props>>;

type P={
    children?: React.ReactNode
}

export type ReactFCWithChildrenAndTypes = React.FC<PropsWithChildren<P>>;