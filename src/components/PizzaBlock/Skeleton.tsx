import { FC } from "react"
import ContentLoader from "react-content-loader"

const Skeleton: FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2.8}
        width={285}
        height={600}
        viewBox="0 0 285 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#aba6a6"
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
        <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="427" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton

