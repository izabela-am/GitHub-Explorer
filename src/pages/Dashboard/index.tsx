import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => (
    <>
        <img src={logoImg} alt="Logo"/>
        <Title>Explore repositórios no GitHub</Title>

        <Form>
            <input placeholder='Nome do repositório' type="text"/>
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            <a href="teste">
                <img
                    src="https://avatars2.githubusercontent.com/u/40214340?s=460&u=fc8c728e6b25e56531f721cb599b82aeb9c20524&v=4"
                    alt="Izabela"
                />
                <div>
                    <strong>Repositorio</strong>
                    <p>Descrição do meu repositório vem aqui</p>
                </div>
                <FiChevronRight size={20}/>
            </a>
        </Repositories>
    </>
);

export default Dashboard;
