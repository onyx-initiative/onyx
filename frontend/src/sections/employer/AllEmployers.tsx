import React, {useState, useEffect} from "react";
import styles from '../../../styles/components/AllEmployers.module.css'
import {EmployerBlock} from "../../components/employer/EmployerBlock";
import { Employer } from "../../../../backend/src/types/db.types";
import { Drawer, Pagination } from "@mantine/core";
import loading_svg from '../../assets/loading.svg';
import Image from 'next/image';

type ListedEmployersProps = {
    employers: Employer[]
}


export default function AllEmployers(props: ListedEmployersProps) {
    const { employers } = props;
    const [activePage, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const employersPerPage = 8; // @todo change this to higher number later
    const numPages = loading ? 1 : Math.ceil(employers.length / employersPerPage);
    const display = employers.slice((activePage - 1) * employersPerPage, activePage * employersPerPage);
    
    if (loading) {
        return (
          <div className={styles.loading}>
            <Image src={loading_svg} alt="Loading..." width={100} height={100}/>
            <h1>Loading...</h1>
          </div>
        )
      }


    return (
        <div className={styles.allEmployersList}> 
            <div className={styles.employer}>
                {display.map((employer: any, index: number) => {
                return (
                    <EmployerBlock employer={employer} key={index} />
                )
                })}
            </div>
            {/* For the pages */}
            
            <div>
        
                    <Pagination 
                page={activePage} 
                onChange={setPage} 
                total={numPages} 
                color="gray"
                position="center"
                />
            </div>
            
        </div>
    
    )
}
