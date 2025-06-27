interface LikeIconProps {
  liked: boolean
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void
}

const LikeIcon = ({ liked, onClick }: LikeIconProps) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={liked ? "red" : "none"}
      viewBox="0 0 24 24"
      stroke="red"
      strokeWidth="1.5"
      style={{ cursor: "pointer" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
      />
    </svg>
  )
}

export default LikeIcon