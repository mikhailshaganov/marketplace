import { ReactNode } from "react"
import RootStore, { StoreContext } from "../Store/RootStore"

export function RootStoreProvider({ children }: { children: ReactNode }) {
    return <StoreContext.Provider value={new RootStore()}>{children}</StoreContext.Provider>
}