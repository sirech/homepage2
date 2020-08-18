from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.network import ELB, InternetGateway, NATGateway, VPC, PublicSubnet, PrivateSubnet

with Diagram("Connecting two services", show=False):
    with Cluster("VPC1"):
        VPC()

        source = EC2("serviceA")


    with Cluster("VPC2"):
        VPC()

        with Cluster("Public Subnet"):
            PublicSubnet()

            elb = ELB("ELB")


        with Cluster("Private Subnet"):
            PrivateSubnet()

            target = EC2("serviceB")

    source >> elb
    elb >> target
