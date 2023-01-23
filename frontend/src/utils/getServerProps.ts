import { GetServerSidePropsContext } from 'next' ;
import { getSession } from 'next-auth/react';

const getServerProps  =  async  (context: GetServerSidePropsContext) => {
    const  session = await getSession(context);
    
    if (!session) {
      return {
            redirect: {
                destination:  '/login' ,
                permanent:  false ,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}

export default getServerProps;