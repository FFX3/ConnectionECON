import { useSelector } from 'react-redux'
import { selectContacts, deleteContact, undoDeleteContact } from '../features/contacts/contactsSlice'
import { store } from '../app/store'
import { Card, Button, Row, Col, Table } from 'react-bootstrap'

export const ContactListDisplay = () => {

    const contactsList = useSelector(selectContacts)

    let contacts = null

    if(contactsList){
        contacts = contactsList.map((contact) => {
            if(contact !== null){
                let newContact = {...contact}
                newContact.deleteSelf = ()=>{store.dispatch(deleteContact(contact.id))}
                newContact.unDeleteSelf = ()=>{store.dispatch(undoDeleteContact(contact.id))}
                return newContact
            }
            return null
        })
    }

    const toBeDeletedOverlayStyle = {
        position: "absolute",
        backgroundColor: "grey",
        opacity: "50%",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        fontSize: "32px",
        paddingTop: "24px",
    }

    const generateListHtml = () => {
        let listArr = []
        if(contacts){
            contacts.map((contact, i) => {
                let undoOrDeleteButton
                if(contact.stagedForDeletion){
                    undoOrDeleteButton = <Button variant="warning" onClick={contact.unDeleteSelf}>Undo Select For Deletetion</Button>
                }else{
                    undoOrDeleteButton = <Button variant="primary" onClick={contact.deleteSelf}>Select Contact For Deletion</Button>
                }
                    listArr.push(
                        <Card 
                            key={contact.id}
                            style={{ margin: '15px auto 15px auto', width: "95%",}}
                        >
                            <Row>
                                <Col xs="12" md="8" style={{  position: "relative", overflow: "hidden", }}>
                                    <Table striped bordered hover size="sm" style={{ margin: '15px'}}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "1px", whiteSpace: "nowrap"}}>
                                                    {`First name:`}
                                                </td>
                                                <td>
                                                    {contact.fname}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ maxWidth: "40px"}}>
                                                    {`Last name:`}
                                                </td>
                                                <td>
                                                    {contact.lname}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ maxWidth: "40px"}}>
                                                    {`Email:`}
                                                </td>
                                                <td>
                                                    {contact.email}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    {contact.stagedForDeletion && <div class="to-be-deleted-overlay" style={toBeDeletedOverlayStyle}>Warning: This Contact Will Be Deleted!</div>}
                                </Col>
                                <Col>
                                    <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100%"}}>
                                        <div>
                                            {undoOrDeleteButton}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    )
                // }
            })}
        return listArr
    }

    return(
        <>
            <Row>
                {
                    generateListHtml()
                }
            </Row>
        </>
    )
}