import { styled } from 'styled-components';

const StyledSection = styled.section`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    text-align: left;
    padding: 0 2rem;

    @media (min-width: 425px) {
        padding: 0 4rem;
    }

    @media (min-width: 768px) {
        padding: 0;
        width: 70%;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const GreetingText = styled.h1`
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 2rem;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};

    @media (min-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
    }

    @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.huge};
    }
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline;
`;

const Definition = styled.h2`
    font-family: ${({ theme }) => theme.fonts.monospace};
    max-width: 100%;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.regular};

    @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.large};
    }
`;

const Hello = () => {
  return (
    <StyledSection id="Hello">
        <TextContainer>
            <GreetingText>
                Hello, I'm <Highlight>Alec</Highlight>.<br />
                I'm a <Highlight>programmer</Highlight>.
            </GreetingText>
            <Definition>
                pro·gram·mer<br />
                /`prōˌgramər/<br />
                noun<br />
                a lifelong learner, driven by insatiable curiosity and a passion for problem-solving.
            </Definition>
        </TextContainer>
    </StyledSection>
  );
};

export default Hello;