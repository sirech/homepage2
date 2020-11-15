from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.network import VPC, PublicSubnet, PrivateSubnet, ELB, Route53

with Diagram("Load Balancer in front of an application", show=True, direction = "TB"):
    dns = Route53("DNS")

    with Cluster("VPC"):
        VPC()

        with Cluster("Public Subnet"):
            PublicSubnet()

            lb = ELB("Network\nLoad Balancer")


        with Cluster("Private Subnet"):
            PrivateSubnet()

            svc_group = [EC2("app%s" % idx) for idx in [1,2,3]]

    dns >> lb
    lb >> svc_group
