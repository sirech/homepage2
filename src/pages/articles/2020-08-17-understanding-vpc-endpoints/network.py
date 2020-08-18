from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.network import InternetGateway, NATGateway, VPC, PublicSubnet, PrivateSubnet
from diagrams.aws.storage import S3

with Diagram("Connecting to S3 over the internet", show=False, direction = "BT"):
    with Cluster("VPC"):
        VPC()

        with Cluster("Public Subnet"):
            PublicSubnet()

            ig = InternetGateway("Internet Gateway")
            nat = NATGateway("NAT Gateway")


        with Cluster("Private Subnet"):
            PrivateSubnet()

            svc_group = [EC2("web%s" % idx) for idx in [1,2,3,4,5]]

    s3 = S3("S3")


    svc_group >> nat
    nat >> ig
    ig >> s3
