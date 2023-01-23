type TButtonVariants = 'primary' | 'secondary' | 'round' | 'link';

const variantStyle = {
  primary:
    'rounded-lg bg-black text-white p-2 w-24 ml-2 hover:underline hover:decoration-solid',
  secondary:
    'rounded-lg border-2 border-black bg-white text-black p-2 w-24 hover:underline hover:decoration-solid',
  round:
    'w-10 h-10 rounded-full pt-0 pb-0.5 bg-black text-white font-semibold text-xl hover:scale-[103%]',
  link: 'mt-4 text-[#97abbc] font-normal underline hover:font-medium ',
};

interface ButtonProps {
  variant: TButtonVariants;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
}

export const Button = ({ variant, onClick, children }: ButtonProps) => {
  return (
    <button type="button" className={variantStyle[variant]} onClick={onClick}>
      {children}
    </button>
  );
};
