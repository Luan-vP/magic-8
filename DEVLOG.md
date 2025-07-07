## 7 Jul

The stateless hook pattern (easier to test and reuse elsewhere) requires cancellation logic to implement debouncing. 

That means in the WebLLM implementation, I'll need to handle the cancellation of requests.

### Cancellation Patterns

**1. AbortController (Modern Web Standard)**
- Use `AbortController` to cancel fetch requests and async operations
- Pass `signal` to operations that support cancellation
- Clean, standardized approach

**2. Reference-based Cancellation**
- Track current operation with a ref
- Check if operation is still "current" before setting results
- Prevents stale results from overwriting newer ones

**3. Promise Cancellation**
- Wrap operations in cancellable promises
- Reject with cancellation reason when cancelled
- Most control but more complex

### Implementation Strategy
For WebLLM: Use AbortController + reference tracking for robust cancellation that prevents race conditions and resource waste.