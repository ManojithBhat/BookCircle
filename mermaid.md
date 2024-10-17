```mermaid
flowchart TD
    A[Start] --> B[Memory Allocation/Deallocation Occurs]
    B --> C{Deallocation Triggered?}
    C -->|Yes| D[Defragmentation in Block]
    C -->|No| E[Check Pool Deallocation Threshold]
    D --> F[Asynchronous Defragmentation & Lock]
    E -->|Threshold Reached| G[Identify Blocks by Fill Level]
    E -->|Not Reached| B
    G --> H[Store Handlers & Perform Pool Defragmentation]
    H --> B


```k