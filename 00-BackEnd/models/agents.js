export default class Agents {
    constructor(
        AgentId,
        AgentUserID,
        AgentGovtId,
        AgentSuccessDelivery,
        AgentFailDelivery,
        table
    ) {
        this.AgentId = agent_id;
        this.AgentUserID = agent_user_id;
        this.AgentGovtId = agent_govt_id;
        this.AgentSuccessDelivery = agent_success_delivery_count;
        this.AgentFailDelivery = agent_fail_delivery_count;
        this.table = "agents"; 
    }

    display() {
        console.log(`Agent User Id= ${this.AgentUserID}`);
        console.log(`Successful Deliveries= ${this.AgentSuccessDelivery}`);
        console.log(`Failed Deliveries= ${this.AgentFailDelivery}`);
    }
}
