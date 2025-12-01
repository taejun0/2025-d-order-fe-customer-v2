import styled from "styled-components";

interface BtnProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Btn = ({ text, onClick, disabled = false }: BtnProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <BtnContainer onClick={handleClick} disabled={disabled} type="button">
      {text}
    </BtnContainer>
  );
};

export default Btn;

const BtnContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 88%;
  height: 50px;
  border-radius: 10px;

  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.Black02 : theme.colors.Orange01};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.Gray01 : theme.colors.Bg};
  ${({ theme }) => theme.fonts.Bold16};

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }
  @media (hover: none) {
    &:active {
      transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
    }
  }
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
