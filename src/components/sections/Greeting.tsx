import { styled, keyframes } from 'styled-components';

const StyledSection = styled.section`
    height: 100vh;
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
    max-width: 55rem;
`;

const GreetingText = styled.div`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 5rem;
    margin-bottom: 2rem;
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline-block;
`;

const Definition = styled.div`
    font-family: ${({ theme }) => theme.fonts.monospace};
    font-size: 2rem;
    max-width: 100%;
`;

const Greeting = () => {
  return (
    <StyledSection>
        <TextContainer>
            <GreetingText>
                Hello, I'm <Highlight>Alec</Highlight>.<br />
                I'm a <Highlight>programmer</Highlight>.
            </GreetingText>
            <Definition>
                pro·gram·mer<br />
                /`prōˌgramər/<br />
                noun<br />
                a lifelong learner, driven by insatiable curiosity and a passion for problem-solving; 
                unbound by traditional labels, applies knowledge across a diverse set of domains to craft innovative solutions.
            </Definition>
        </TextContainer>
    </StyledSection>
  );
};

export default Greeting;