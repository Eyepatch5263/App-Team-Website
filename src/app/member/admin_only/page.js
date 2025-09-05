"use client";

function AdminOnly() {

    return(
        <>        
            <div className="flex bg-[#140b29] justify-center items-center text-xl font-bold text-[#a594f9] min-h-screen lg:text-3xl">
                You don&apos;t have access to this page
            </div>        
        </>
    )

}
export default AdminOnly