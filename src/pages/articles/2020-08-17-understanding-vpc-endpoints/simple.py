from diagrams import Cluster, Diagram
from diagrams.aws.network import Endpoint
from diagrams.aws.storage import S3

with Diagram("Private Communication", show=False):
    with Cluster("VPC"):
        ep = Endpoint()

    s3 = S3("S3")

    ep >> s3
