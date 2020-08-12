import  React, { useState, FormEvent }  from "react";
import { Link } from "react-router-dom";

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import PageHeader from "../../components/PageHeader";

import "./styles.css";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

export default function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [weekDay, setWeekDay] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: { subject, week_day: weekDay, time }
        });

        setTeachers(response.data);

    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value) }
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Ciências', label: 'Ciências'},
                            {value: 'Educação Física', label: 'Educação Física'},
                            {value: 'Física', label: 'Física'},
                            {value: 'História', label: 'História'},
                            {value: 'Matemática', label: 'Matemática'},
                            {value: 'Português', label: 'Português'},
                            {value: 'Química', label: 'Química'},
                            {value: 'Sociologia', label: 'Sociologia'},
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da Semana"
                        value={weekDay}
                        onChange={e => setWeekDay(e.target.value) }
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sábado'},
                        ]}
                    />
                    <Input 
                        name="time" 
                        label="Hora"
                        value={time}
                        type="time"
                        onChange={(e) => { 
                            setTime(e.target.value)                        }}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}