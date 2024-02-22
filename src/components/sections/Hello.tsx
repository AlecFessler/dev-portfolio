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
    margin: 0 auto;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 374px) {
        width: 90%;
    }
    @media (min-width: 375px) { // shrink to keep 2 line definition
        width: 65%;
    }
    @media (min-width: 400px) {
        width: 70%;
    }
    @media (min-width: 768px) {
        width: 55%;
    }
    @media (min-width: 1200px) {
        width: 45%;
    }
    @media (min-width: 1440px) {
        width: 40%;
    }
    @media (min-width: 2560px) {
        width: 30%;
    }
`;

const GreetingText = styled.h1`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 400;
    @media (min-width: 400px) {
        font-size: 2.5rem;
    }
    @media (min-width: 583px) { // to stick to 2 lines of text
        font-size: 3rem;
    }
    @media (min-width: 768px) {
        font-size: 4rem;
    }
    @media (min-width: 850px) {
        font-size: 4.5rem;
    }
    @media (min-width: 1024px) {
        font-size: 5rem;
    }
    @media (min-width: 2560px) {
        font-size: 8rem;
    }
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline;
`;

const Definition = styled.h2`
    font-family: ${({ theme }) => theme.fonts.monospace};
    font-size: 1.25rem;
    max-width: 100%;
    font-weight: 400;
    @media (min-width: 400px) {
        font-size: 1.5rem;
    }
    @media (min-width: 583px) { // to resize with the h1
        font-size: 1.75rem;
    }
    @media (min-width: 768px) {
        font-size: 2rem;
    }
    @media (min-width: 1024px) {
        font-size: 2.5rem;
    }
    @media (min-width: 2560px) {
        font-size: 3.5rem;
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